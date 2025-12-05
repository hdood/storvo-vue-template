export default function parseQueryParams(url: string) {
   const params = new URL(url).searchParams;
   const parsedParams: { [key: string]: any } = {};

   for (const [key, value] of params) {
      const match = key.match(/^(.+?)\[(\d+)]$/); // Matches keys like brands[0], brands[1]
      if (match) {
         const paramName = match[1];
         const index = parseInt(match[2], 10);

         if (!parsedParams[paramName]) {
            parsedParams[paramName] = [];
         }

         parsedParams[paramName][index] = value;
      } else {
         parsedParams[key] = value;
      }
   }

   return parsedParams;
}
