import { $createPokemonNode } from "../nodes/PokemonNode";
import { useEffect } from "react";
import { TextNode } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import type {LexicalEditor, LexicalNode} from 'lexical';

 
function endsWithPokemon(inputString: string): boolean {
    const targetSuffix = "//pokemon";
    const lastIndex = inputString.lastIndexOf(targetSuffix);
    
    if (lastIndex === -1) {
      return false; 
    }
  
    return lastIndex === inputString.length - targetSuffix.length;
  }

function nodeTransform(node: LexicalNode): void {
  const textContent = node.getTextContent();
  if (endsWithPokemon(textContent)) {
    node.replace($createPokemonNode());

  }
}

function usePokemon(editor: LexicalEditor): void {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(
      TextNode,
      nodeTransform,
    );
    return () => {
      removeTransform();
    };
  }, [editor]);
}

export default function PokemonPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  usePokemon(editor);
  return null;
}
