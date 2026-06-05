import { locations } from "@/data/locations";
import {
  getMockReservations,
  reservationExperiences,
} from "@/data/reservations";
import {
  serviceFailure,
  serviceSuccess,
  type ServiceResponse,
} from "@/services/contracts";
import type { RestaurantLocation } from "@/types/location";
import type { Reservation, ReservationExperience } from "@/types/reservation";

/** Lists reservation seed data behind the future reservation API boundary. */
export async function listReservations(): Promise<
  ServiceResponse<Reservation[]>
> {
  return serviceSuccess(getMockReservations());
}

/** Lists bookable reservation experiences for future Supabase-backed reads. */
export async function listReservationExperiences(): Promise<
  ServiceResponse<ReservationExperience[]>
> {
  return serviceSuccess(reservationExperiences);
}

/** Lists restaurant locations through a typed service boundary. */
export async function listLocations(): Promise<
  ServiceResponse<RestaurantLocation[]>
> {
  return serviceSuccess(locations);
}

/** Resolves one location by id for future location detail routes. */
export async function getLocation(
  id: string,
): Promise<ServiceResponse<RestaurantLocation>> {
  const location = locations.find((candidate) => candidate.id === id);

  return location
    ? serviceSuccess(location)
    : serviceFailure("location_not_found", "Location was not found.");
}
