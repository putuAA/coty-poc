import { gql } from "@/utils/common";

export const queryProducts = (status: string | null) => gql`
        query ProductsQuery {
          products(first: 6, query: "${status}") {
            nodes {
              id
              description
              featuredImage {
                altText
                height
                id
                url
                width
              }
              handle
              priceRangeV2 {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              tags
              title
            }
          }
        }
      `
export const queryProduct = (id: string) => {
    return {
        query: gql`
        query SingleProductQuery($id: ID!) {
          product(id: $id) {
            description
            hasOnlyDefaultVariant
            featuredImage {
              altText
              height
              id
              url
              width
            }
            images(first: 10) {
              edges {
                node {
                  id
                  altText
                  height
                  url
                  width
                }
              }
            }
            id
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            tags
            title
            variants(first: 10) {
              edges {
                node {
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            metafields(first: 10) {
              edges {
                node {
                  key
                  value
                }
              }
            }
            vendor
          }
        }
      `,
        variables: {
            id: `gid://shopify/Product/${id}`,
        },
    }
}