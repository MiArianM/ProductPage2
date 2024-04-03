const Getting = async () => {
  const jso = await fetch("../data.json");
  const Data = await jso.json();
  return Data;
};
export default Getting;
