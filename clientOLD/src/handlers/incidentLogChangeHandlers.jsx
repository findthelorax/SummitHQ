export const handlePatrollerChange = (event, newValue, setSelectedPatrollers, setNewRow) => {
    setSelectedPatrollers(newValue);
    const patrollersString = newValue.map((patroller) => `${patroller.firstName} ${patroller.lastName}`).join(', ');
    const patrollerIds = newValue.map((patroller) => patroller._id);
    setNewRow((prevState) => ({
        ...prevState,
        patrollers: patrollersString,
        patrollerIds,
    }));
};

export const handleTimeChange = (field, time, setNewRow) => {
    setNewRow(prevState => ({
        ...prevState,
        [field]: time
    }));
};

export const handleInputChange = (event) => {
};

export const handleCheckboxChange = (event) => {
    setDryRun(event.target.checked);
};