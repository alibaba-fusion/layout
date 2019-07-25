---
title: Box demo
order: 1
importStyle: true
---

# Box

Box是 以 flex 布局为原型的 @alifd/layout 布局的基础。

````jsx
import { Box } from '@alifd/layout';

class BoxDemo extends React.Component {
    render() {
        return (
        <div className="list">
            <div className="list-item">
                <Box direction="row" wrap="wrap" lineColor="#000" lineWidth={1} lineStyle='solid' spacing={30}>
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={100} direction="row" wrap="wrap" width={150} spacing={8} padding={10}>
                        <Box lineColor="#000" lineWidth={1} lineStyle='dashed' height={20} width={30} margin={[3,6]} style={{marginRight: 10}}/>
                        <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={20} width={30} />
                        <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={20} width={30} />
                        <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={20} width={30} />
                        <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={20} width={30} />
                        <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={20} width={30} />
                        <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={20} width={30} />
                    </Box>

                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={100} width={150} />
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={100} width={150} />
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={100} width={150} />
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={100} width={150} />
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={100} width={150} />
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={100} width={150} />
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={100} width={150} />
                </Box>
            </div>

            <div className="list-item">
                <Box direction="row" wrap="wrap" spacing={30} justify='center'>
                    <div style={{
                        height: '100px',
                        width: '50px',
                        border: '1px solid #000'
                    }} >abc</div>
                    <div style={{
                        height: '100px',
                        width: '50px',
                        border: '1px solid #000'
                    }} />
                    <span alignSelf={'center'}>31242</span>
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={100} width={150} />
                    <div style={{
                        height: '100px',
                        width: '50px',
                        border: '1px solid #000'
                    }} />
                </Box>
            </div>
            <div className="list-item">
                <Box spacing={30} align="stretch">
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={30} />
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={30} style={{marginTop: 0}}/>
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={30} margin={[10, 20]}/>
                    <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={30} />
                </Box>
            </div>
            <div className="list-item">
                <Box direction="row" wrap="wrap" spacing={30}>
                    <Box flex={1} lineColor="#000" lineWidth={1} lineStyle='solid' height={200} width={150}>
                        <Box height={200} spacing={20}>
                            <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={40} width={150} />
                            <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={40} width={150} />
                            <Box lineColor="#000" lineWidth={1} lineStyle='solid' height={40} width={150} />
                        </Box>
                    </Box>
                    <Box flex={1} lineColor="#000" lineWidth={1} lineStyle='solid' height={200} width={150} />
                    <Box flex={1} lineColor="#000" lineWidth={1} lineStyle='solid' height={200} width={150} />
                </Box>
            </div>
        </div>
        );
    }
}

ReactDOM.render(<BoxDemo />, mountNode);
````
````css
.list {
  position: relative;
}
.list-item {
  position: relative;
  background: #ddd;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.child {
  width: 100%;
  height: 100%;
  background: 'red';
}
````
