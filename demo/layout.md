---
title: Layout demo
order: 5
importStyle: true
---

````jsx
import { Layout, Box } from '@alifd/layout';

const { Header, Footer, Main, Aside } = Layout;

class LayoutDemo extends React.Component {
  render() {
    return (
      <div className="layout-list">
        <div className="list-item">
          <Layout>
            <Aside>Aside</Aside>
            <Layout>
              <Header>header</Header>
              <Main />
              <Footer>footer</Footer>
            </Layout>
            <Aside>Aside2</Aside>
          </Layout>
        </div>
        <div className="list-item">
          <Layout className="layout">
            <Header>header</Header>
            <Layout>
              <Aside>Aside</Aside>
              <Main>main</Main>
            </Layout>
            <Footer>footer</Footer>
          </Layout>
        </div>

        <div className="list-item">
          <Layout className="layout">
            <Header>header</Header>
            <Layout>
              <Aside>Aside</Aside>
              <Layout>
                <Main>main</Main>
                <Footer>footer</Footer>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<LayoutDemo />, mountNode);
````

````css
.list-item {
  width: 600px;
  margin-top: 20px;
}

.layout-list header,
.layout-list footer,
.layout-list aside,
.layout-list section {
  border: 1px solid #fff !important;
  justify-content: center !important;
  text-align: center !important;
}

.layout-list header,
.layout-list footer {
  background: #7dbcea !important;
  color: #fff;
}

.layout-list aside {
  min-width: 100px;
  background: #3ba0e9 !important;
  align-items: center !important;
}

.layout-list section {
  background: rgba(16, 142, 233, 1) !important;
  color: #fff !important;
  min-height: 120px;
}
````
