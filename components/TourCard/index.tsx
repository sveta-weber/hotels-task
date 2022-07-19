import React, { FC } from "react";
import { Box, Flex, Image, AspectRatio, Icon, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export type Tour = {
  id: number;
  name: string;
  description: string;
  minPrice: number;
  stars?: string;
  photos?: string[];
  apartmentTypes?: string[];
  tourTypes?: string[];
  transportType?: string;
  fromRegion?: string;
  fromCity?: string;
  toRegion?: string;
  toCity?: string;
};

const TourCard: FC<{ data: Tour }> = ({ data }) => {
  const {
    name,
    stars,
    description,
    minPrice,
    photos,
    apartmentTypes,
    tourTypes,
    transportType,
    fromRegion,
    fromCity,
    toRegion,
    toCity,
  } = data;

  const starsQuantity = stars ? stars.match(/\u{2b50}/gu)?.length : 0;

  const fullPlace = (places: (string | undefined)[]) => {
    return places.filter((place) => place).join(", ");
  };

  return (
    <Flex
      w="100%"
      borderColor="gray.200"
      borderWidth="1px"
      borderRadius="md"
      fontSize="xs"
      lineHeight="1.2"
      overflow="hidden"
      flexDirection={{
        base: "column",
        md: "row",
      }}
    >
      <AspectRatio
        ratio={240 / 300}
        maxHeight={{
          base: "300px",
          md: "100%",
        }}
        bg="gray.200"
        w={{
          base: "100%",
          md: "240px",
        }}
        flexShrink="0"
      >
        {photos && <Image src={photos[0]} alt={name} />}
      </AspectRatio>

      <Flex
        p="6"
        flexDirection="column"
        alignItems="flex-start"
        flexGrow="1"
        rowGap="4"
      >
        <Flex
          gap="4"
          alignItems={{
            base: "flex-start",
            sm: "center",
          }}
          flexDirection={{
            base: "column",
            sm: "row",
          }}
        >
          <Flex columnGap="1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={
                    starsQuantity && i < starsQuantity ? "blue.500" : "gray.300"
                  }
                />
              ))}
          </Flex>
          {tourTypes && <Box>{tourTypes.join(", ")}</Box>}
        </Flex>

        <Box fontSize="xl">{name}</Box>

        <Flex flexWrap="wrap" gap="1" alignItems="center">
          {(fromRegion || fromCity) && (
            <span>{fullPlace([fromRegion, fromCity])}</span>
          )}
          {(toRegion || toCity) && (
            <>
              <Icon viewBox="0 0 24 6" color="blue.500" w="24px" h="6px">
                <path
                  d="M0 3h23m0 0L20.5.5M23 3l-2.5 2.5"
                  stroke="currentColor"
                />
              </Icon>
              <span>{fullPlace([toRegion, toCity])}</span>
            </>
          )}
        </Flex>

        {transportType && <Box>{transportType}</Box>}

        {apartmentTypes && <Box>{apartmentTypes.join(", ")}</Box>}

        <Box>{description}</Box>

        <Button mt="auto" ml="auto" colorScheme="blue">
          от {minPrice} ₽*
        </Button>
      </Flex>
    </Flex>
  );
};

export default TourCard;
