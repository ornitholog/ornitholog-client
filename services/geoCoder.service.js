const geoCoder = async (longditude, latitude) => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longditude}&localityLanguage=en`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching geo data:", error);
  }
};

export default {
  geoCoder,
};
