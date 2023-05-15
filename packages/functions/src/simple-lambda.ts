import notes from "@sst-cold-start-rest-api/core/notes";

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify(notes),
  };
}