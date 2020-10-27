import React from "react";
import { Container, Spinner } from "@chakra-ui/core";
import { useQuery } from "react-query";

type Hotel = {
  id?: number;
  apartmentType?: string;
  city?: string;
  region?: string;
  stars?: string;
  sanatoriumType?: string;
  resort?: string;
  minPrice: number;
  name: string;
  description: string;
  photos: string[];
  bookingUrl: string;
  isSkiResort?: boolean;
};

// пример
// tour: true
// q[tour_kinds_name_in][]: Активный отдых
// q[name_i_cont]: горы
// page: 1

const fetchTours = (): Promise<Array<Hotel>> => {
  return fetch("/api/search?tour=tru&page=1", {
    headers: {
      accept: "application/json",
    },
    method: "GET",
  }).then((res) => res.json());
};

const DemoPage = () => {
  const toursRequest = useQuery("tours", fetchTours);

  if (toursRequest.isFetching) return <Spinner />;

  return (
    <Container>
      <pre>{JSON.stringify(toursRequest.data, null, 2)}</pre>
    </Container>
  );
};

export default DemoPage;
