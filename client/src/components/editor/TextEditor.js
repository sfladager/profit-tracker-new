import { useState, useEffect, useCallback } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'

// imports needed to convert html to draft for editor
import { EditorState, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'

const TextEditor = ({ formFields, setFormFields }) => {

  const [ editorState, setEditorState ] = useState()

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    setFormFields({ ...formFields, session_notes: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
  }

  // code to convert html saved in article to draft to load into editor if article data is present
  const loadNotes = () => {
    if (formFields.session_notes) {
      const blocksFromHtml = htmlToDraft(formFields.session_notes)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }

  useEffect(() => {
    loadNotes()
  }, [formFields.owner_of_session])

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  )
}
export default TextEditor