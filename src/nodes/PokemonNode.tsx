import { DecoratorNode } from "lexical";
import { ReactNode } from "react";
import type { LexicalNode, NodeKey } from "lexical";
import PokemonDropdown from "../pokemonDropdown";

export class PokemonNode extends DecoratorNode<ReactNode> {
  static getType(): string {
    return "pokemon";
  }

  static clone(node: PokemonNode): PokemonNode {
    return new PokemonNode(node.__id);
  }

  constructor(key?: NodeKey) {
    super(key);
  }

  createDOM(): HTMLElement {
    return document.createElement("div");
  }

  updateDOM(): false {
    return false;
  }

  decorate(): ReactNode {
    return <PokemonDropdown />;
  }
}

export function $createPokemonNode(): PokemonNode {
  return new PokemonNode();
}

export function $isPokemonNode(
  node: LexicalNode | null | undefined
): node is PokemonNode {
  return node instanceof PokemonNode;
}
