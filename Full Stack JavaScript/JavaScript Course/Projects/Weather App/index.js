const GIF = (function () {
  async function displayWeatherConditions(gifPromise) {
    const gif = await gifPromise;

    if (!gif.ok) throw new Error(`Failed to fetch GIF: ${gif.status}`);

    const data = await gif.json();
    const img = document.querySelector('.container img');
    img.src = data.data.images.original.url;
  }

  function fetchGIF(data) {
    const gif = fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=Aw3gWB8hNrTYLwATQDaP47cBQj9yZHv1&s=${data}`,
      { mode: 'cors' }
    );
    try {
      displayWeatherConditions(gif);
    } catch (error) {
      console.error(error.message);
    }

    return gif;
  }

  return {
    fetchGIF,
  };
})();

class Weather {
  constructor(location, degreeUnit, date1, date2) {
    if (!location) {
      throw new Error('Location is required!');
    }

    this.location = location;
    this.date1 = date1;
    this.date2 = date2;
    this.degreeUnit = degreeUnit?.toUpperCase() === 'C' ? '°C' : '°F';
  }

  fetchData(location, date1, date2) {
    return fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}${
        date1 ? `/${date1}` : ''
      }${date2 ? `/${date2}` : ''}?key=X2RRHCETSUNX4HHGL7VCU2AN3`
    );
  }

  async getData() {
    try {
      const response = await this.fetchData(
        this.location,
        this.date1,
        this.date2
      );
      if (response.status !== 200)
        throw new Error("Couldn't proceed with the fetching!");

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error thrown while fetching weather data:', error);
    }
  }

  async getDescription() {
    try {
      const response = await this.fetchData(
        this.location,
        this.date1,
        this.date2
      );
      if (response.status !== 200)
        throw new Error("Couldn't proceed with the fetching!");

      const data = await response.json();
      console.log(`resolvedAddress: ${data.resolvedAddress}`);

      const datetime = data.days?.[0]?.datetime ?? data.datetime;
      const description = data.days?.[0]?.description ?? data.description;

      GIF.fetchGIF(description);

      return `date: ${datetime}, description: ${description}`;
    } catch (error) {
      console.error('Error thrown while fetching weather data:', error);
      return 'No Data Available for: description';
    }
  }

  async getConditions() {
    try {
      const response = await this.fetchData(
        this.location,
        this.date1,
        this.date2
      );
      if (response.status !== 200)
        throw new Error("Couldn't proceed with the fetching!");

      const data = await response.json();
      const conditions = this.date1
        ? data.days[0]?.conditions
        : data.conditions;

      if (conditions) {
        GIF.fetchGIF(conditions)
      }

      return conditions;
    } catch (error) {
      console.error('Error thrown while fetching weather data:', error);
      return 'No Data Available for: conditions';
    }
  }
}

(async () => {
  const weather2 = new Weather('China', 'F');

  await weather2.getData();

  console.log(await weather2.getDescription());
  console.log(await weather2.getConditions());
})();
