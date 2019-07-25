---
title: Image demo
order: 3
importStyle: true
---

````jsx
import { Image } from '@alifd/layout';

class ImageDemo extends React.Component {
  render() {
    return (
      <div className="list">
        <Image src="http://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png" width={142} height={58} />
      </div>
    );
  }
}

ReactDOM.render(<ImageDemo />, mountNode);
````

````css
.list {
  position: relative;
}
````
