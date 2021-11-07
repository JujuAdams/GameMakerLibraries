/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * A tag can be used to categorize libraries for filtering and sorting.
 */
export type Tag =
  | "asset"
  | "community"
  | "editor"
  | "graphics"
  | "pipeline"
  | "room"
  | "shader"
  | "sprite"
  | "text"
  | "ui";
/**
 * The version(s) of GameMaker this library is compatible with.
 */
export type GameMakerCompatibility = ("8" | "Studio" | "Studio 2" | "Studio 2.3")[];

/**
 * Data documenting GameMaker libraries, for use in generating READMEs etc.
 */
export interface GameMakerLibraryData {
  /**
   * The title of the entire listing
   */
  title: string;
  /**
   * Description of the entire listing
   */
  description: string;
  /**
   * List of libraries
   */
  libraries: AGameMakerLibrary[];
}
export interface AGameMakerLibrary {
  /**
   * The title of the library
   */
  title: string;
  /**
   * Description of the library
   */
  description?: string;
  /**
   * URL of the library
   */
  url: string;
  /**
   * URL of the library's GitHub repository, if it has one.
   */
  githubUrl?: string;
  tags?: Tag[];
  authors?: Author[];
  compatibility?: GameMakerCompatibility;
}
/**
 * An author is a person or organization that has contributed to the library.
 */
export interface Author {
  name?: string;
  /**
   * The author home page.
   */
  website?: string;
  /**
   * The author's Twitter handle.
   */
  twitter?: string;
  /**
   * The author's GitHub username.
   */
  github?: string;
  /**
   * Companies, communities, or other significant entities the author is a member of.
   */
  affiliations?: string[];
}