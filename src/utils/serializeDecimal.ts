export function serializePrismaData(data: any): any {
  // Convert Decimal values to numbers to avoid serialization issues
  const serializedData = data.map((item: any) => {
    const serializedItem = { ...item };
    for (const key in serializedItem) {
      if (
        serializedItem[key] instanceof Object &&
        "toNumber" in serializedItem[key]
      ) {
        serializedItem[key] = serializedItem[key].toNumber();
      }
    }
    return serializedItem;
  });
  return serializedData;
}
