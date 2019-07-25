---
title: Text demo
order: 2
---

````jsx
import { Box, Text } from '@alifd/layout';

class TextDemo extends React.Component {
  render() {
    return (
      <div className="list">
        <Text color="#000">This <Text color="red">is</Text> a text.</Text>
        <br />
        <Box direction="row"> 
            <Text fontWeight="bold">This is a text.</Text>
            <Text fontWeight="bold">This is a text.</Text>
            <Text fontWeight="bold">This is a text.</Text>
        </Box>
        <br />
        <Text textDecorationLine="line-through">This is a text.</Text>
        <br />
        <Text fontStyle="italic">This is a text.</Text>        
        <br />
        <Text fontSize={20}>This is a text.</Text>
      </div>
    );
  }
}

ReactDOM.render(<TextDemo />, mountNode);
````
