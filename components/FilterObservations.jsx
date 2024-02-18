import { useEffect, useState } from "react";

function FilterObservations({ observationList, setDisplayedObservations }) {
  
  // filter species & habitat
  const [selectedBird, setSelectedBird] = useState('all');
  const [selectedHabitat, setSelectedHabitat] = useState('all');
  const [uniqueBirdNames, setUniqueBirdNames] = useState([]);
  const [uniqueHabitats, setUniqueHabitats] = useState([]);

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
      <div className="filter-wrap">
        <div>
          <select value={selectedBird} onChange={changeBirdNameSelect}>
            <option value="all">All birds</option>
            {uniqueBirdNames &&
              uniqueBirdNames.map((elm, i) => (
                <option value={elm} key={i}>
                  {elm}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select value={selectedHabitat} onChange={changeHabitatSelect}>
            <option value="all">All habitats</option>
            {uniqueHabitats &&
              uniqueHabitats.map((elm, i) => (
                <option value={elm} key={i}>
                  {elm}
                </option>
              ))}
          </select>
        </div>
      </div>

    </>
  );
}

export default FilterObservations;
