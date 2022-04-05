import React, { useState } from 'react';

const Checkbox = () => {
  const [formData, setFormData] = useState({
    boy: false,
    girl: true,
    hetero : false
  });
  const handleChange = (e) => {
      console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };
  const { boy, girl, hetero } = formData;
  return (
    <form>
      {(!boy) && (<><input
        type="checkbox"
        name="boy"
        value={boy}
        onChange={(e) => handleChange(e)}
      />{' '}
      Boy
      <br /></>)}
      {(!girl) && (<><input
        type="checkbox"
        name="girl"
        value={girl}
        onChange={(e) => handleChange(e)}
      />{' '}
      girl
      <br /></>)}
      {(!hetero) && (<><input
        type="checkbox"
        name="hetero"
        value={hetero}
        onChange={(e) => handleChange(e)}
      />{' '}
      hetero
      <br /></>)}
    </form>
  );
};

export default Checkbox;