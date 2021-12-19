import classes from "../ChooseBetween/ChooseGat.module.css";
import { Card, Row, Col, Container, Image } from "react-bootstrap";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store of browser provider/auth-context";
const ChooseGat = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const onClickHandler = (event) => {
    event.preventDefault();
    authCtx.category(event.target.name);

    history.push("/NotOrWallet");
  };

  return (
    <Container className={classes.alignthecard}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card border="blue" className={classes.card} onClick={onClickHandler}>
            <Image name="note" src="/img/Note2.jpg" />
            <Card.Body>
              <p> Note</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md="auto">
          <Card border="blue" className={classes.card}>
            <Image
              name="wallet"
              style={{ width: 250, height: 250, borderRadius: 250 / 2 }}
              src="/img/wallet.png"
              onClick={onClickHandler}
            />
            <Card.Body>
              <p> wallet</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChooseGat;
