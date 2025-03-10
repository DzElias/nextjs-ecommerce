export const getMenuQuery = /* GraphQL */ `
  query homeCategories {
    homeCategories(
        input: [
            { key: "status", value: "1" }
        ], 
    ) {
        id
        parentId
        categoryId
        name
        logoPath
        slug
        urlPath
        description
        children {
            id
            name
            slug
            urlPath
            parentId
        }
    }
}
`;
