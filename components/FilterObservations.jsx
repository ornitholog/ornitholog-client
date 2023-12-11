import { useEffect, useState } from "react";

function FilterObservations({ observationList, setDisplayedObservations }) {
  // filter bird, habitat...
  const [selectedBird, setSelectedBird] = useState('all');
  const [selectedHabitat, setSelectedHabitat] = useState('all');
  const [uniqueBirdNames, setUniqueBirdNames] = useState([]);
  const [uniqueHabitats, setUniqueHabitats] = useState([]);
  // const [displayedObservations, setDisplayedObservations] = useState(observationList);

  useEffect(() => {
    if (observationList) {
      const birdNames = observationList.map(elm => elm.birdId.name);
      const habitats = observationList.map(elm => elm.habitat);
  
      setUniqueBirdNames([...new Set(birdNames)]);
      setUniqueHabitats([...new Set(habitats)]);
    }
  }, [observationList]);

  useEffect(() => {
    if (observationList && observationList.length > 0) {
      const filteredObservations = observationList.filter((elm) => {
        const birdNameCondition = selectedBird === 'all' || selectedBird === elm.birdId.name;
        const habitatCondition = selectedHabitat === 'all' || selectedHabitat === elm.habitat;

        return birdNameCondition && habitatCondition;
      });

      setDisplayedObservations(filteredObservations);
      // setObservations(filteredObservations);
    }
  }, [selectedBird, selectedHabitat, observationList]);

  const changeBirdNameSelect = e => {
    setSelectedBird(e.target.value);
  };

  const changeHabitatSelect = e => {
    setSelectedHabitat(e.target.value);
  };

  return (
    <>
      <div className="bird-filter">
        <select value={selectedBird} onChange={changeBirdNameSelect}>
          <option value="all">All</option>
          {uniqueBirdNames &&
            uniqueBirdNames.map((elm, i) => (
              <option value={elm} key={i}>
                {elm}
              </option>
            ))}
        </select>
      </div>
      <div className="habitat-filter">
        <select value={selectedHabitat} onChange={changeHabitatSelect}>
          <option value="all">All</option>
          {uniqueHabitats &&
            uniqueHabitats.map((elm, i) => (
              <option value={elm} key={i}>
                {elm}
              </option>
            ))}
        </select>
      </div>

    </>
  );
}

export default FilterObservations;
