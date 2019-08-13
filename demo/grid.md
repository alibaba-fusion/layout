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
              <Grid height={200} gap={10}>
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

            <div className="list" style={{display: 'flex'}}>
              <div className="list-item" style={{display: 'inline-block', width: '100%'}}>
                <Grid gap={10} device="desktop">
                  <Box className="mygrid grid-12" colSpan={12}>12</Box>
                  <Box className="mygrid grid-6" colSpan={6}>6</Box>
                  <Box className="mygrid grid-6" colSpan={6}>6</Box>
                  <Box className="mygrid grid-4" colSpan={4}>4</Box>
                  <Box className="mygrid grid-4" colSpan={4}>4</Box>
                  <Box className="mygrid grid-4" colSpan={4}>4</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                </Grid>
              </div>
              <div className="list-item" style={{display: 'inline-block', width: '100%', margin: '0 20px 20px'}}>
                <Grid gap={10} device="tablet">
                  <Box className="mygrid grid-12" colSpan={12}>12</Box>
                  <Box className="mygrid grid-6" colSpan={6}>6</Box>
                  <Box className="mygrid grid-6" colSpan={6}>6</Box>
                  <Box className="mygrid grid-4" colSpan={4}>4</Box>
                  <Box className="mygrid grid-4" colSpan={4}>4</Box>
                  <Box className="mygrid grid-4" colSpan={4} tabletColSpan={8}>4 tabletColSpan=8</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                </Grid>
              </div>
              <div className="list-item" style={{display: 'inline-block', width: '100%'}}>
                <Grid gap={10} device="phone">
                  <Box className="mygrid grid-12" colSpan={12}>12</Box>
                  <Box className="mygrid grid-6" colSpan={6}>6</Box>
                  <Box className="mygrid grid-6" colSpan={6}>6</Box>
                  <Box className="mygrid grid-4" colSpan={4}>4</Box>
                  <Box className="mygrid grid-4" colSpan={4}>4</Box>
                  <Box className="mygrid grid-4" colSpan={4}>4</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                  <Box className="mygrid grid-3" colSpan={3}>3</Box>
                  <Box className="mygrid grid-3" colSpan={3} phoneColSpan={2}>3 phoneColSpan=2</Box>
                </Grid>
              </div>
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
.mygrid {
  display: block;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.grid-12 {
  background: red;
}
.grid-6 {
  background: purple;
}
.grid-4 {
  background: orange;
}
.grid-3 {
  background: green;
}
````
