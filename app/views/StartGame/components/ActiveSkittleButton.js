import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';

const SkittleButton = props => {
  const [selected, setSelected] = useState('contained');

  useEffect(() => {
    if (props.status === 'reset') {
      setSelected('contained');
      props.clear();
    }
  }, [props.status]);

  return (
    <Button
      mode={selected}
      labelStyle={{fontSize: 25}}
      onPress={() => {
        setSelected(selected === 'contained' ? 'outlined' : 'contained'),
          props.check();
      }}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 33,
        width: 66,
        height: 66,
        marginHorizontal: 6,
      }}>
      {props.children}
    </Button>
  );
};

export default SkittleButton;
