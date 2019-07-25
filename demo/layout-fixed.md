---
title: Layout fixed demo
order: 6
importStyle: true
---

````jsx
import { Layout, Box } from '@alifd/layout';

const { Header, Footer, Main, Aside } = Layout;

const LoneContext = (
  <div>
    <br /><br />
    top
    <br /><br /><br /><br /><br /><br /><br /><br /><br />
    middle
    <br /><br /><br /><br /><br /><br /><br /><br /><br />
    bottom
  </div>
);

class LayoutDemo extends React.Component {
  render() {
    return (
      <div className="layout-list-fixed">
        <div className="layout-list-item">
          <span className="item-title">吸顶</span>
          <Layout>
            <Header height="50px">header</Header>
            <Layout height="250px" style={{ overflow: 'auto' }} >
              <Main>
                {'<Layout height="250px"/> '} <br />
                可以写成 <br /> {'<Layout height={\'calc(100vh - ${HeaderHignt})\'} />'}
                {LoneContext}
              </Main>
              <Footer>footer</Footer>
            </Layout>
          </Layout>
        </div>
        <div className="layout-list-item">
          <span className="item-title">吸顶-吸底</span>
          <Layout>
            <Header height="50px">header</Header>
            <Layout height="200px" style={{ overflow: 'auto' }}>
              <Main>
                {'<Layout height="200px"/> '} <br />
                可以写成 <br /> {'<Layout height={\'calc(100vh - ${HeaderHignt} - ${FooterHignt})\'} />'}
                {LoneContext}
              </Main>
            </Layout>
            <Footer height="50px">footer</Footer>
          </Layout>
        </div>
        <div className="layout-list-item">
          <span className="item-title">吸顶-吸边</span>
          <Layout>
            <Header height="50px">header</Header>
            <Layout height="250px" style={{ overflow: 'auto' }}>
              <Aside width="100px">Aside</Aside>
              <Main width="300px" style={{ overflow: 'auto' }}>
                {'<Layout height="250px"/> '} <br />
                可以写成 <br /> {'<Layout height={\'calc(100vh - ${HeaderHignt})\'} />'} <br />
                <br />
                {'<Main width="300px"/> '} <br />
                可以写成 <br /> {'<Main width={\'calc(100vw - ${AsideWidth})\'} />'}
                {LoneContext}
                <Footer>footer</Footer>
              </Main>
            </Layout>
          </Layout>
        </div>

        <div className="layout-list-item">
          <span className="item-title">吸顶 + aside</span>
          <Layout>
            <Header height="50px">header</Header>
            <Layout height="250px" style={{ overflow: 'auto' }}>
              <Layout spacing={20}>
                <Aside width="100px">Aside</Aside>
                <Main width="300px">
                  {'<Layout height="250px"/> '} <br />
                  可以写成 <br /> {'<Layout height={\'calc(100vh - ${HeaderHignt})\'} />'} <br />
                  <br />
                  {'<Main width="300px"/> '} <br />
                  可以写成 <br /> {'<Main width={\'calc(100vw - ${AsideWidth})\'} />'}
                  {LoneContext}
                </Main>
              </Layout>
              <Footer>footer</Footer>
            </Layout>
          </Layout>
        </div>

        <div className="layout-list-item">
          <span className="item-title">吸顶-吸底 + aside</span>
          <Layout>
            <Header height="50px">header</Header>
            <Layout maxHeight="200px" style={{ overflow: 'auto' }}>
              <Layout height="100%">
                <Aside width="100px">Aside</Aside>
                <Main width="300px">
                  {'<Layout maxHeight="200px"/> '} <br />
                  可以写成 <br /> {'<Layout height={\'calc(100vh - ${HeaderHignt})\'} />'} <br />
                  <br />
                  {'<Main width="300px"/> '} <br />
                  可以写成 <br /> {'<Main width={\'calc(100vw - ${AsideWidth})\'} />'}
                  {LoneContext}
                </Main>
              </Layout>
            </Layout>
            <Footer height="50px">footer</Footer>
          </Layout>
        </div>

        <div className="layout-list-item">
          <span className="item-title">吸顶-吸底-吸边</span>
          <Layout>
            <Header height="50px">header</Header>
            <Layout height="200px" style={{ overflow: 'auto' }}>
              <Aside width="100px">Aside</Aside>
              <Main width="300px" style={{ overflow: 'auto' }}>
                {'<Layout height="200px"/> '} <br />
                可以写成 <br /> {'<Layout height={\'calc(100vh - ${HeaderHignt})\'} />'} <br />
                <br />
                {'<Main width="300px"/> '} <br />
                可以写成 <br /> {'<Main width={\'calc(100vw - ${AsideWidth})\'} />'}
                {LoneContext}
              </Main>
            </Layout>
            <Footer height="50px">footer</Footer>
          </Layout>
        </div>

        <div className="layout-list-item">
          <span className="item-title">吸顶-吸底-吸边2</span>
          <Layout>
            <Header height="50px">header</Header>
            <Layout height="250px" style={{ overflow: 'auto' }}>
              <Aside width="100px">Aside</Aside>
              <Layout width="300px">
                <Main style={{ overflow: 'auto' }}>
                  {'<Layout height="200px"/> '} <br />
                  可以写成 <br /> {'<Layout height={\'calc(100vh - ${HeaderHignt})\'} />'} <br />
                  <br />
                  {'<Layout width="300px"/> '} <br />
                  可以写成 <br /> {'<Layout width={\'calc(100vw - ${AsideWidth})\'} />'}
                  {LoneContext}
                </Main>
                <Footer height="50px">footer</Footer>
              </Layout>
            </Layout>
          </Layout>
        </div>

        <div className="layout-list-item">
          <span className="item-title">吸底</span>
          <Layout>
            <Layout height="250px" style={{ overflow: 'auto' }}>
              <Header>header</Header>
              <Layout>
                <Aside width="100px">Aside</Aside>
                <Main width="300px">
                  {'<Layout height="200px"/> '} <br />
                  可以写成 <br /> {'<Layout height={\'calc(100vh - ${HeaderHignt})\'} />'} <br />
                  <br />
                  {'<Main width="300px"/> '} <br />
                  可以写成 <br /> {'<Main width={\'calc(100vw - ${AsideWidth})\'} />'}
                  {LoneContext}
                </Main>
              </Layout>
            </Layout>
            <Footer height="50px">footer</Footer>
          </Layout>
        </div>
        <div className="layout-list-item">
          <span className="item-title">吸边</span>
          <Layout height="100%">
            <Aside width="100px">Aside</Aside>
            <Layout width="300px" style={{ overflow: 'auto' }}>
              <Header>header</Header>
              <Main>
                {'<Layout width="300px"/> '} <br />
                可以写成 <br /> {'<Layout width={\'calc(100vw - ${AsideWidth})\'} />'}
                {LoneContext}
              </Main>
              <Footer>footer</Footer>
            </Layout>
          </Layout>
        </div>
        <div className="layout-list-item">
          <span className="item-title">吸边-吸顶</span>
          <Layout height="100%">
            <Aside width="100px">Aside</Aside>
            <Layout width="300px">
              <Header height="50px">header</Header>
              <Main height="250px" style={{ overflow: 'auto' }}>
                {'<Layout width="300px"/> '} <br />
                可以写成 <br /> {'<Layout width={\'calc(100vw - ${AsideWidth})\'} />'}
                {LoneContext}
              </Main>
            </Layout>
          </Layout>
        </div>
        <div className="layout-list-item">
          <span className="item-title">吸边-吸底-吸顶</span>
          <Layout height="100%">
            <Layout>
              <Aside width="100px">Aside</Aside>
              <Layout width="300px">
                <Header height="50px">header</Header>
                <Main height="250px" style={{ overflow: 'auto' }}>
                  {'<Layout width="300px"/> '} <br />
                  可以写成 <br /> {'<Layout width={\'calc(100vw - ${AsideWidth})\'} />'} <br />
                  <br />
                  {'<Main width="250px"/> '} <br />
                  可以写成 <br /> {'<Main width={\'calc(100vh - ${HeaderHeight})\'} />'}
                  {LoneContext}
                </Main>
              </Layout>
            </Layout>
            <Footer>footer</Footer>
          </Layout>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<LayoutDemo />, mountNode);
````

````css
.layout-list-fixed {
  display: flex;
  flex-wrap: wrap;
}
.layout-list-item {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 50px 50px 0;
}
.item-title {
  position: absolute;
  top: -1.5em;
  font-size: 1.5em;
  left: 0;
  z-index: 1;
}

.layout-list-fixed header,
.layout-list-fixed footer,
.layout-list-fixed aside,
.layout-list-fixed section {
  text-align: center !important;
}

.layout-list-fixed header,
.layout-list-fixed footer {
  background: #7dbcea !important;
  color: #fff;
}

.layout-list-fixed aside {
  background: #3ba0e9 !important;
  align-items: center !important;
}

.layout-list-fixed section {
  background: rgba(16, 142, 233, 1) !important;
  color: #fff !important;
}
````