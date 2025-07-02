const BASE_URL = 'http://localhost:3000/api/v1';

export async function fetchListings(queryParams = '') {
  const res = await fetch(`${BASE_URL}/listings${queryParams}`);
  return res.json();
}

export async function fetchListing(id: string) {
  const res = await fetch(`${BASE_URL}/listings/${id}`);
  return res.json();
}

export async function createListing(data: any) {
  const res = await fetch(`${BASE_URL}/listings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchApplicationsBySitter(sitterId: string) {
  const res = await fetch(`${BASE_URL}/sitters/${sitterId}/applications`);
  return res.json();
}

export async function fetchApplicationsByListing(listingId: string) {
  const res = await fetch(`${BASE_URL}/listings/${listingId}/applications`);
  return res.json();
}

export async function updateApplicationStatus(applicationId: string, status: string) {
  return fetch(`${BASE_URL}/applications/${applicationId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
}
