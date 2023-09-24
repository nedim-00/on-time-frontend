export default function enumKeys<T extends Record<number, string>>(
  enumObject: T
) {
  return formatEnumKeys(
    Object.values(enumObject).slice(0, Object.values(enumObject).length / 2)
  ) as (keyof typeof enumObject)[];
}

export function formatStringToEnum(enumString: string): string {
  return enumString.replace(/\s+/g, '');
}

export function formatEnumKeys(enumKeys: string[]): string[] {
  return enumKeys.map((enumKey) =>
    enumKey.replace(/(?<=[a-z])([A-Z])/g, ' $1')
  );
}
