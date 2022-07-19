import React, { useState, useEffect } from "react";
import {
  Container,
  Spinner,
  Center,
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  CheckboxGroup,
  Checkbox,
  useCheckboxGroup,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { tourTypes } from "../dicts";
import TourCard, { Tour } from "../components/TourCard";
import Pagination from "../components/Pagination";
import qs from "qs";
import { StringOrNumber } from "@chakra-ui/utils";

type TourList = {
  collection: Tour[];
  page: number;
  total: number;
  limit: number;
  minPrice: number;
  maxPrice: number;
};

type TourFilters = {
  tour?: boolean;
  q?: {
    tour_kinds_name_in?: StringOrNumber[];
    name_i_cont?: string;
  };
};

const initialFilter: TourFilters = {
  tour: true,
  q: {},
};

const fetchTours = (params: TourFilters, page: number): Promise<TourList> => {
  return fetch(
    `/api/search?${qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false,
    })}&page=${page}`,
    {
      headers: {
        accept: "application/json",
      },
      method: "GET",
    }
  ).then((res) => res.json());
};

const DemoPage = () => {
  const [filters, setFilters] = useState<TourFilters>(initialFilter);

  const [page, setPage] = useState<number>(1);

  const toursRequest = useQuery(
    ["tours", filters, page],
    () => fetchTours(filters, page),
    { keepPreviousData: true }
  );

  const updateQFilters = (filter, value) => {
    setFilters((state) => ({
      ...state,
      q: { ...state.q, [filter]: value },
    }));
    setPage(1);
  };

  const [searchFilter, setSearchFilter] = useState({
    initialState: true,
    value: "",
  });

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      !searchFilter.initialState &&
        updateQFilters("name_i_cont", searchFilter.value);
    }, 800);

    return () => clearTimeout(typingTimer);
  }, [searchFilter]);

  const { getCheckboxProps } = useCheckboxGroup();

  if (toursRequest.isLoading || toursRequest.isIdle) {
    return (
      <Center height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (toursRequest.isError) {
    return <span>Error</span>;
  }

  return (
    <Container maxW="container.xl" pl="5" pr="5">
      <Flex
        as="section"
        gap={{
          base: "40px",
          xl: "110px",
        }}
        pt="14"
        pb="14"
        flexDirection={{
          base: "column",
          lg: "row",
        }}
      >
        <Flex
          flexBasis="260px"
          flexShrink="0"
          flexDirection="column"
          rowGap="8"
        >
          <FormControl>
            <FormLabel fontWeight="bold">Тип тура</FormLabel>
            <CheckboxGroup
              colorScheme="green"
              onChange={(value) => {
                updateQFilters("tour_kinds_name_in", value);
              }}
            >
              <Stack rowGap="2">
                {tourTypes.map((type) => (
                  <Checkbox
                    key={type.id}
                    lineHeight="1.2"
                    {...getCheckboxProps({ value: type.name })}
                  >
                    {type.name}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="bold">Наименование</FormLabel>
            <Input
              onChange={(event) => {
                setSearchFilter({
                  initialState: false,
                  value: event.target.value,
                });
              }}
            />
          </FormControl>
        </Flex>
        <Flex flexGrow="1" flexDirection="column" rowGap="5">
          {toursRequest.data.collection.length !== 0 ? (
            <>
              <Flex
                gap="5"
                alignItems={{
                  base: "flex-start",
                  md: "center",
                }}
                flexDirection={{
                  base: "column",
                  md: "row",
                }}
              >
                <Pagination
                  page={page}
                  pageCount={Math.ceil(
                    toursRequest.data.total / toursRequest.data.limit
                  )}
                  onPageChange={(page) => {
                    setPage(page);
                  }}
                />
                <Box
                  fontSize="xs"
                  ml={{
                    base: "0",
                    md: "auto",
                  }}
                >
                  Найдено&nbsp;{toursRequest.data.total}
                </Box>
              </Flex>
              {toursRequest.data.collection.map((tour, index) => (
                <TourCard key={index} data={tour} />
              ))}
            </>
          ) : (
            <Center flexDirection="column" gap="5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.PUBLIC_URL}images/cat.svg`}
                alt="Туры не найдены"
              />
              <Text>Туры не найдены</Text>
            </Center>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default DemoPage;
