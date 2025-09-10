/* eslint-disable @typescript-eslint/no-explicit-any */
import { AtomicBlockUtils, CompositeDecorator, Editor, EditorState, RichUtils } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import React, { useEffect, useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
type Props = {
    value: string,
    onChange: (v: string) => void
}
const Image = (props: any) => {
    const { src } = props.contentState.getEntity(props.entityKey).getData();
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className='w-full' />;
};
const decorator = new CompositeDecorator([
    {
        strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE'
                );
            }, callback);
        },
        component: Image,
    },
]);

const TextArea = ({ value, onChange }: Props) => {

    const [_outPut, set_outPut] = useState<string>("")
    const [_type, set_type] = useState<string>("")
    const [_editorState, set_EditorState] = useState(EditorState.createEmpty(decorator));

    useEffect(() => {
        const _stateContent = stateFromHTML(value)
        set_EditorState(EditorState.createWithContent(_stateContent, decorator))
    }, [value])

    useEffect(() => {
        const _stateContent = _editorState.getCurrentContent()
        const _content = stateToHTML(_stateContent, {
            blockStyleFn: (block) => {
                const type = block.getType();
                if (type === 'text-center') {
                    return {
                        attributes: { class: 'text-center' },
                    };
                }
                if (type === 'text-right') {
                    return {
                        attributes: { class: 'text-right' },
                    };
                }
            },
        })
        set_outPut(_content)
    }, [_editorState])

    useEffect(() => {
        onChange(_outPut)
    }, [_outPut, onChange])

    const createBlockStyle = (value: EditorState, type: string) => {
        set_EditorState(RichUtils.toggleBlockType(value, type));
        set_type(_type => _type === type ? "" : type)
    }

    const createImage = async (value: EditorState) => {
        const selection = value.getSelection();
        const content = value.getCurrentContent();
        const startOffset = selection.getStartOffset();
        const endOffset = selection.getEndOffset();
        const block = content.getBlockForKey(selection.getStartKey());
        const text = block.getText()
        const contentStateWithEntity = content.createEntity('IMAGE', 'MUTABLE', { src: text.slice(startOffset, endOffset) });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(value, entityKey, ' ');
        set_EditorState(newEditorState);
    }

    const makeTextRight = async (value: EditorState) => {
        set_EditorState(RichUtils.toggleBlockType(value, 'text-right'));
        set_type(type => type !== 'text-right' ? 'text-right' : "")
    }
    const makeTextCenter = async (value: EditorState) => {
        set_EditorState(RichUtils.toggleBlockType(value, 'text-center'));
        set_type(type => type !== 'text-center' ? "text-center" : "")
    }
    const createInlineStyle = (value: any, type: string) => {
        set_EditorState(RichUtils.toggleInlineStyle(value, type));
    }
    const getCurrentBlockType = (editorState: EditorState) => {
        const selection = editorState.getSelection();
        const content = editorState.getCurrentContent();
        const block = content.getBlockForKey(selection.getStartKey());
        return block.getType(); // Trả về kiểu như 'unstyled', 'header-one', 'blockquote', v.v.
    };

    const tool = [
        {
            name: "h1",
            func: () => createBlockStyle(_editorState, "header-one"),
            type: "header-one",
        },
        {
            name: "h2",
            func: () => createBlockStyle(_editorState, "header-two"),
            type: "header-two",
        },
        {
            name: "h3",
            func: () => createBlockStyle(_editorState, "header-three"),
            type: "header-three",
        },
        {
            name: "h4",
            func: () => createBlockStyle(_editorState, "header-four"),
            type: "header-four",
        },
        {
            name: "h5",
            func: () => createBlockStyle(_editorState, "header-five"),
            type: "header-five",
        },
        {
            name: "p",
            func: () => createBlockStyle(_editorState, "paragraph"),
            type: "paragraph",
        },
        {
            name: "</>",
            func: () => createBlockStyle(_editorState, "code-block"),
            type: "code-block",
        },
        {
            name: "B",
            func: () => createInlineStyle(_editorState, "BOLD"),
            type: "BOLD",
        },
        {
            name: <ImageIcon className='h-full m-auto' />,
            func: () => createImage(_editorState),
            type: "IMAGE"
        },
        {
            name: <FormatAlignCenterIcon className='h-full m-auto' />,
            func: () => makeTextCenter(_editorState),
            type: "text-center",
        },
        {
            name: <FormatAlignRightIcon className='h-full m-auto' />,
            func: () => makeTextRight(_editorState),
            type: "text-right",
        },
    ]
    function myBlockStyleFn(contentBlock: { getType: () => any; }) {
        const type = contentBlock.getType();
        if (type === 'text-center') {
            return 'text-center';
        }
        if (type === 'text-right') {
            return 'text-right';
        }
        return '';
    }
    return (
        <div className='min-h-72 rounded'>
            <div className='sticky top-0 h-12 py-1 flex gap-1 z-[1]'>
                {
                    tool.map((tl, index) =>
                        <div key={index} className={`h-full aspect-square flex flex-col justify-center text-center border border-three/25  rounded text-sm cursor-pointer ${_editorState.getCurrentInlineStyle().has(tl.type) || getCurrentBlockType(_editorState) === (tl.type) ? "bg-three text-white" : "bg-white"} `} onClick={tl.func}>{tl.name}</div>
                    )
                }
            </div>
            <div className='dangerous_box font-sans'>
                <Editor editorState={_editorState} onChange={(editorState) => set_EditorState(editorState)} blockStyleFn={myBlockStyleFn} />
            </div>
        </div>
    )
}

export default TextArea


