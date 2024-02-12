//format pricing
export const formatPrice = (price: string) =>
    Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format(parseInt(price, 10));

export const gql = String.raw;

export const handleError = async (response: {}) => {
    if (!response.ok) {
        const text = await response.text(); //  get the response body for more information

        throw new Error(`
      Failed to fetch data
      Status: ${response.status}
      Response: ${text}
    `);
    }
}

export const getVariantKeys = (variantList: [] | {}): any[] => {
    const variantKeys: any[] = [];
    variantList.forEach(
        (item: { node: { selectedOptions: { name: any }[] } }): any => {
            item.node.selectedOptions.forEach((a: { name: any }) => {
                if (variantKeys.indexOf(a.name) === -1) variantKeys.push(a.name);
            });
        }
    );

    return variantKeys;
};

export const getVariantValueByKey = (variantList: any[], key: string) => {
    const variantValues: any[] = [];
    variantList.forEach((item) => {
        item.node.selectedOptions.forEach((a: { name: any; value: any }) => {
            if (a.name === key) {
                if (variantValues.indexOf(a.value) === -1) variantValues.push(a.value);
            }
        });
    });

    return variantValues;
};

export const getProductCode = (data: any[]) => {
    const fields = data.map((a, b) => {
        if (a.node.key === "product_code") {
            return a.node.value
        }
    });
    return fields;
};

