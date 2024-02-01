// src/types/index.ts

export type ShopifyExtension = {
    cost: {
        actualQueryCost: number;
        requestedQueryCost: number;
        throttleStatus: {
            currentlyAvailable: number;
            maximumAvailable: number;
            restoreRate: number;
        };
    };
};

export type ShopifyProduct = {
    description: string;
    id: string;
    variants: {
        edges: object;
    }
    vendor: string;
    hasOnlyDefaultVariant: boolean;
    featuredImage: {
        altText: string;
        height: number;
        id: string;
        url: string;
        width: number;
    };
    images: {
        altText: string;
        height: number;
        id: string;
        url: string;
        width: number;
        edges: object;
    }[];
    handle: string;
    priceRangeV2: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
    tags: string[];
    title: string;
    metafields: {
        key: string;
        value: string;
        edges: object;
    }[]
};