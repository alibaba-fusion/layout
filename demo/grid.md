---
title: Grid demo
order: 1
importStyle: true
---

# Grid

Grid是 以 flex 布局为原型的 @alifd/layout 布局的基础。

````jsx
import { Grid, Box } from '@alifd/layout';

class GridDemo extends React.Component {
    render() {
        return (
        <div className="list">
            <div className="list-item">
              <Grid height={200} rows={3} columns={4} dense gap={[10, 20]} >
                  <Grid lineStyle={'solid'} lineWidth={1} row={1} col={1} rowSpan={2}/>
                  <Grid lineStyle={'solid'} lineWidth={1} />
                  <Grid lineStyle={'solid'} lineWidth={1} />
                  <Grid lineStyle={'solid'} lineWidth={1} />
                  <Grid lineStyle={'solid'} lineWidth={1} />
                  <Grid lineStyle={'solid'} lineWidth={1} />
              </Grid>
            </div>
            <div className="list-item">
              <Grid height={200} rows={3} columns={3} gap={10}>
                  <Grid lineStyle={'solid'} lineWidth={1} row={1} col={1} colSpan={2} />
                  <Grid lineStyle={'solid'} lineWidth={1} row={1} col={3} rowSpan={2} />
                  <Grid lineStyle={'solid'} lineWidth={1} row={2} col={1} rowSpan={2} />
                  <Grid lineStyle={'solid'} lineWidth={1} />
                  <Grid lineStyle={'solid'} lineWidth={1} row={3} col={2} colSpan={2} />
              </Grid>
            </div>

            <div className="list-item">
              <Grid height={200} rows={3} gap={10}>
                  <Box lineWidth={1} lineStyle={'solid'} />
                  <Box lineWidth={1} lineStyle={'solid'} />
                  <Box lineWidth={1} lineStyle={'solid'} />
              </Grid>
            </div>

            <div className="list-item">
              <Grid columns={2} gap={10} autoRowsHeight={50}>
                  <Box lineWidth={1} lineStyle={'solid'} />
                  <Box lineWidth={1} lineStyle={'solid'} />
                  <Box lineWidth={1} lineStyle={'solid'} />
                  <Box lineWidth={1} lineStyle={'solid'} />
                  <Box lineWidth={1} lineStyle={'solid'} />
                  <Box lineWidth={1} lineStyle={'solid'} />
                  <Box lineWidth={1} lineStyle={'solid'} />
                  <Box lineWidth={1} lineStyle={'solid'} />
                  <Box lineWidth={1} lineStyle={'solid'} />
              </Grid>
            </div>
            
        </div>
        );
    }
}

ReactDOM.render(<GridDemo />, mountNode);
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
