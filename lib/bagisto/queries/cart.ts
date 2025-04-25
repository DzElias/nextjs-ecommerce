// Consulta corregida para el carrito
export const getCartQuery = /* GraphQL */ `
  query cartDetail {
    cartDetail {
      id
      customerEmail
      customerFirstName
      customerLastName
      shippingMethod
      couponCode
      isGift
      itemsCount
      itemsQty
      exchangeRate
      globalCurrencyCode
      baseCurrencyCode
      channelCurrencyCode
      cartCurrencyCode
      grandTotal
      baseGrandTotal
      subTotal
      baseSubTotal
      taxTotal
      baseTaxTotal
      discountAmount
      baseDiscountAmount
      checkoutMethod
      isGuest
      isActive
      conversionTime
      customerId
      channelId
      appliedCartRuleIds
      items {
        id
        quantity
        sku
        type
        name
        couponCode
        weight
        totalWeight
        baseTotalWeight
        price
        basePrice
        total
        baseTotal
        taxPercent
        taxAmount
        baseTaxAmount
        discountPercent
        discountAmount
        baseDiscountAmount
        parentId
        productId
        cartId
        taxCategoryId
        customPrice
        appliedCartRuleIds
        createdAt
        updatedAt
        product {
          id
          type
          attributeFamilyId
          sku
          parentId
          productFlats {
            id
            sku
            name
            description
            shortDescription
            urlKey
            new
            featured
            status
            visibleIndividually
            thumbnail
            price
            cost
            specialPrice
            specialPriceFrom
            specialPriceTo
            weight
          }
          variants {
            id
            type
            attributeFamilyId
            sku
            parentId
          }
          parent {
            id
            type
            attributeFamilyId
            sku
            parentId
          }
          attributeValues {
            id
            productId
            attributeId
            locale
            channel
            textValue
            booleanValue
            integerValue
            floatValue
            dateTimeValue
            dateValue
            jsonValue
            attribute {
              id
              code
              adminName
              type
            }
          }
          superAttributes {
            id
            code
            adminName
            type
            position
          }
          inventories {
            id
            qty
            productId
            inventorySourceId
            vendorId
          }
          images {
            id
            type
            path
            url
            productId
          }
        }
        formattedPrice {
          price
          basePrice
          total
          baseTotal
          taxAmount
          baseTaxAmount
          discountAmount
          baseDiscountAmount
        }
      }
      formattedPrice {
        grandTotal
        baseGrandTotal
        subTotal
        baseSubTotal
        taxTotal
        baseTaxTotal
        discount
        baseDiscount
        discountedSubTotal
        baseDiscountedSubTotal
      }
      shippingAddress {
        id
        addressType
        cartId
        firstName
        lastName
        gender
        companyName
        address1
        address2
        postcode
        city
        state
        country
        email
        phone
        defaultAddress
      }
      billingAddress {
        id
        addressType
        cartId
        firstName
        lastName
        gender
        companyName
        address1
        address2
        postcode
        city
        state
        country
        email
        phone
        defaultAddress
      }
      selectedShippingRate {
        id
        carrier
        carrierTitle
        method
        methodTitle
        methodDescription
        price
        basePrice
        discountAmount
        baseDiscountAmount
        cartAddressId
        createdAt
        updatedAt
        formattedPrice {
          price
          basePrice
        }
      }
      payment {
        id
        method
        methodTitle
        cartId
      }
    }
  }
`;

// Mantener la consulta createCartMutation sin cambios
export const createCartMutation = /* GraphQL */ `
  mutation createCart {
    cartCreate {
      cart {
        id
        customerEmail
        customerFirstName
        customerLastName
        shippingMethod
        couponCode
        isGuest
        itemsCount
        itemsQty
        cartCurrencyCode
        grandTotal
        baseGrandTotal
        subTotal
        baseSubTotal
        taxTotal
        baseTaxTotal
        discountAmount
        baseDiscountAmount
        checkoutMethod
        isActive
        items {
          id
          type
          quantity
          sku
          name
          couponCode
          weight
          totalWeight
          baseTotalWeight
          price
          basePrice
          total
          baseTotal
          taxPercent
          taxAmount
          baseTaxAmount
          discountPercent
          discountAmount
          baseDiscountAmount
          parentId
          productId
          cartId
          taxCategoryId
          customPrice
          appliedCartRuleIds
          createdAt
          updatedAt
          product {
            id
            type
            name
            attributeFamilyId
            sku
            parentId
            variants {
              id
              type
              attributeFamilyId
              sku
              parentId
            }
            parent {
              id
              type
              attributeFamilyId
              sku
              parentId
            }
            attributeValues {
              id
              productId
              attributeId
              locale
              channel
              textValue
              booleanValue
              integerValue
              floatValue
              dateTimeValue
              dateValue
              jsonValue
              attribute {
                id
                code
                adminName
                type
              }
            }
            superAttributes {
              id
              code
              adminName
              type
              position
            }
            inventories {
              id
              qty
              productId
              inventorySourceId
              vendorId
            }
            images {
              id
              url
              type
              path
              productId
            }
          }
          formattedPrice {
            price
            basePrice
            total
            baseTotal
            taxAmount
            baseTaxAmount
            discountAmount
            baseDiscountAmount
          }
        }
        payment {
          id
          method
          methodTitle
          cartId
        }
        selectedShippingRate {
          id
          carrier
          carrierTitle
          method
          methodTitle
          methodDescription
          price
          basePrice
          discountAmount
          baseDiscountAmount
          cartAddressId
          createdAt
          updatedAt
          formattedPrice {
            price
            basePrice
          }
        }
        shippingAddress {
          id
          addressType
          cartId
          firstName
          lastName
          gender
          companyName
          address1
          address2
          postcode
          city
          state
          country
          email
          phone
          defaultAddress
        }
        formattedPrice {
          grandTotal
          baseGrandTotal
          subTotal
          baseSubTotal
          taxTotal
          baseTaxTotal
          discount
          baseDiscount
          discountedSubTotal
          baseDiscountedSubTotal
        }
      }
    }
  }
`;
