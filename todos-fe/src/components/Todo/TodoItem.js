import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import axios from "axios";
import loading from "../../images/loading.gif";
import { STATUS_WORD, STATUS_COLOR } from "../../configs/status";

const TodoList = () => {
  const { todoId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function todosData() {
      let res = await axios.get(`http://localhost:3001/api/todos/${todoId}`);
      setItem(res.data);
    }
    todosData();
  }, []);

  //await會暫停函式，所以有可能data還沒抓到就已經讀取到下面的item.title
  //此時title是null就會出現錯誤，因為null沒有title這個值}
  //所以當item === null時，先return
  //當data抓到後，setItem()後就會重新渲染，所以就不會進到這個if
  if (item === null) {
    return (
      <>
        載入中
        <img src={loading} alt="Loading data" />
      </>
    );
  }

  return (
    <>
      <div className="column is-three-fifths">
        <article className={`panel ${STATUS_COLOR[item.status]}`}>
          <p className="panel-heading">
            {STATUS_WORD[item.status]} {item.title}
          </p>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="#" alt="Placeholder" /> {/* alt="Placeholder image */}
            </figure>
          </div>
          <div className="panel-block">{item.content}</div>
          <ul>
            <li className="panel-block">到期日: {item.deadline}</li>
            <li className="panel-block">ＸＸＸ 於 YYYY-MM-DD 建立</li>
            <li className="panel-block">ＯＯＯ 於 YYYY-MM-DD 更新</li>
          </ul>
          <footer className="card-footer">
            <a href="#/" className="card-footer-item">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Done
            </a>
            <EditBtn />
            <DeleteBtn />
          </footer>
        </article>
      </div>
      <div className="column is-two-fifths">
        <article className="panel is-link">
          <p className="panel-heading">共享</p>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input" type="email" placeholder="輸入帳號" />
            </div>
            <div className="control">
              <a className="button is-info">新增</a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default TodoList;
