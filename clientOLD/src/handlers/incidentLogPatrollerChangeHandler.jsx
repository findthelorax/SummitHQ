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