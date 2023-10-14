import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Pagination, Row, message } from "antd";
import { context } from "../components/appContext";
import {
  NoticeListElement,
  NoticeListElementProps,
} from "../components/noticeListElement";
import { DetailNotice, DetailNoticeProps } from "../components/detailNotice";
import { getNoticesAPI, getNoticesDetailAPI } from "../services/letter";
import { sleep } from "../utils/tools";
import "../components/css/letter.css";

function Notice() {
  const { user } = useContext(context);
  const [ct, setCt] = useState(0); // user改变计数
  const [listData, setListData] = useState<NoticeListElementProps[]>([]); // 评论数据
  const [detailTotal, setDetailTotal] = useState(0); // 单对话私信总数
  const [currentTopic, setCurrentTopic] = useState("");
  const [detailQuery, setDetailQuery] = useState({}); // 查询条件
  const [detailData, setDetailData] = useState<DetailNoticeProps[]>([]); // 单对话私信数据
  const navigate = useNavigate();

  // 默认检查当前用户是否登录，已登录跳转主页
  useEffect(() => {
    // 这个也想直接从user取值就好，但应该是先执行子组件的useEffect再执行父组件的useEffect，先第二次调用再判断
    if (ct >= 1 && user.userId == 0) {
      navigate("/");
      message.error("禁止未登录访问");
    }
    setCt(ct + 1);
  }, [user]); // 监听user变化

  useEffect(() => {
    getNoticesAPI().then((res) => {
      console.log(res);
      setListData(res.data);
    });
  }, []);  // 用监听noticeQuery的方法好像经常不会变，所以直接调用api了

  useEffect(() => {
    getNoticesDetailAPI(currentTopic, detailQuery).then((res) => {
      console.log(res);
      setDetailData(res.data);
      setDetailTotal(res.total);
    });
  }, [detailQuery, currentTopic]); // 监听detailQuery改变

  const turnPage = (page: number, _: number) => {
    // 翻页函数，_是pageSize
    setDetailQuery({
      ...detailQuery,
      page,
    });
    sleep(500).then(() => {
      // 加上延迟避免多线程更新不及时
      getNoticesAPI().then((res) => {
        console.log(res);
        setListData(res.data);
      });
    });
    console.log(page);
  };

  return (
    <Row>
      <Col span={5} offset={4} id="letter">
        {listData.length <= 0 ? (
          <Row
            align="middle"
            justify="center"
            style={{ fontSize: "16px", minHeight: "100px" }}
          >
            无通知
          </Row>
        ) : (
          listData.map((data, index) => (
            <Row key={index}>
              <NoticeListElement
                type={data.type}
                noticeRecord={data.noticeRecord}
                username={data.username}
                count={data.count}
                unreadCount={data.unreadCount}
                setNoticeType={setCurrentTopic}
                setDetailQuery={setDetailQuery}
                setListData={setListData}
              />
            </Row>
          ))
        )}
      </Col>
      <Col span={9} offset={1}>
        {/* 通知 */}
        <Row style={{ display: detailTotal > 0 ? "" : "none" }}>
          <Col
            span={24}
            id="letter"
            style={{
              padding: "10px",
            }}
          >
            {/* 具体调用 */}
            {detailData.map((detail, index) => (
              <Row key={index}>
                <DetailNotice {...detail} />
              </Row>
            ))}
          </Col>
        </Row>
        {/* 页码 */}
        <Row>
          <Col
            span={24}
            style={{
              display: detailTotal >= 10 ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
            }}
            id="letter"
          >
            <Pagination
              defaultCurrent={1}
              showSizeChanger={false}
              total={detailTotal}
              onChange={turnPage}
              hideOnSinglePage={true}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Notice;
