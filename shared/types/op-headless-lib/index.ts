export interface IDropdownData {
  /**
   * title is the title of the dropdown item (can be the same as value if no translation is needed)
   */

  title: string

  /**
   * value is the value of the dropdown item
   */
  value: string | number

  /**
   * clear is the value of the dropdown item
   */
  clear?: boolean

  /**
   * icon is the icon of the dropdown item
   */
  icon?: string

  /**
   * img is the img of the dropdown item
   */
  img?: string

  /**
   * imgAlt is the alt attribute for img of the dropdown item
   */
  imgAlt?: string

  /**
   * disabled will determine if the dropdown item is disabled or not
   */
  disabled?: boolean
}
