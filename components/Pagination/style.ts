import styled from "styled-components";

export const StyledContainer = styled.div`
  .pagination {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    list-style: none;
    font-size: var(--chakra-fontSizes-xs);
    font-weight: var(--chakra-fontWeights-semibold);

    &__break a,
    &__page-link {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 32px;
      height: 32px;
      user-select: none;
      outline: none;
    }

    &__break a {
      border: 1px solid transparent;
    }

    &__page-link {
      cursor: pointer;
      border-radius: 4px;
      color: var(--chakra-colors-black);
      border: 1px solid var(--chakra-colors-gray-200);
      transition-property: var(--chakra-transition-property-common);
      transition-duration: var(--chakra-transition-duration-normal);

      &:hover:not(&_active) {
        background-color: var(--chakra-colors-gray-200);
      }

      &_active {
        background-color: var(--chakra-colors-blue-500);
        border-color: var(--chakra-colors-blue-500);
        color: var(--chakra-colors-white);
        pointer-events: none;
      }
    }

    &__disabled {
      pointer-events: none;
      opacity: 0.5;
      .pagination__page-link {
        color: var(--chakra-colors-gray-500);
      }
    }
  }
`;
