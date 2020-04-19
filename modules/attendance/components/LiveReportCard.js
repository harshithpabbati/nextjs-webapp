import React from 'react';
import { Card, List, Avatar, Badge, Tabs } from 'antd';

const { TabPane } = Tabs;


import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const LiveReportCard = ({ data, isLoaded }) => {
  const membersCard = members => (
    <List
      grid={{ gutter: 16, column: 1, sm: 2, md: 3, lg: 4 }}
      dataSource={members}
      locale={{ 'emptyText': "No one is identified in FOSSLab right now."}}
      renderItem={member => (
        <List.Item>
          <Card>
          <List.Item.Meta
            avatar={
              <Avatar
                icon="user"
              />
            }
            title={
              <a href={`/@${member.username}`}>
                <b>
                  {member.firstName} {member.lastName}
                </b>
              </a>
            }
            description={
              <div>
                <b>Since</b> {moment(member.firstSeenToday).format('HH:mm')} <br/>
                <b>For</b> {member.duration}
              </div>
            }
          />
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <div className="p-4">
      <Tabs
        defaultActiveKey="1"
        size="large"
        type="line"
      >
        <TabPane
          key={1}
          tab={
            <h6 className="p-2 m-0">
              Present Now
              <Badge
                count={isLoaded && data.membersPresent ? data.membersPresent.count : null}
                style={{ margin: "0.5rem", backgroundColor: "green"}}
              />
            </h6>
          }>
          { isLoaded ? membersCard(data.membersPresent.members) : null }
        </TabPane>
        </Tabs>
    </div>
  );
};

export default LiveReportCard;
