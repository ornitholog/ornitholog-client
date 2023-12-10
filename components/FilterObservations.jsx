function FilterObservations({ observationList }) {
  //filter: birdname, habitat
  const uniqueHabitat = [...new Set(observationList.map((elm) => elm.habitat))];
  const uniqueBirdName = [
    ...new Set(observationList.map((elm) => elm.birdId.name)),
  ];
  return (
    <div>
      <select>
        <option></option>
      </select>
    </div>
  );
}

export default FilterObservations;
