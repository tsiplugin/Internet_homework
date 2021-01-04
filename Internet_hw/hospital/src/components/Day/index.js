import React from 'react';
import { Tag, Button, Dropdown, Menu } from 'antd';
import './Day.css';
import store from '../../redux';

class Day extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availableTimes: [],
    };
  }

  deleteDay = async () => {
    const responce = await fetch(
      `http://localhost:3000/days/${this.props._id}`,
      {
        method: 'DELETE',
      }
    );

    window.location.reload();

    // const result = await responce.json();

    // const newData = store
    //   .getState()
    //   .days.filter((item) => item._id !== result._id);

    // store.dispatch({ type: 'SET_DATA', payload: newData });
  };

  addAppointment = () => {
    const allTimes = [
      '08:00',
      '08:20',
      '08:40',
      '09:00',
      '09:20',
      '09:40',
      '10:00',
      '10:20',
      '10:40',
      '11:00',
      '11:20',
      '11:40',
      '12:00',
      '12:20',
      '12:40',
      '13:00',
      '13:20',
      '13:40',
      '14:00',
      '14:20',
      '14:40',
      '15:00',
      '15:20',
      '15:40',
      '16:00',
      '16:20',
      '16:40',
      '17:00',
      '17:20',
      '17:40',
    ];

    const busyTime = [
      ...this.props.appointments.first.map((item) => item.time),
      ...this.props.appointments.second.map((item) => item.time),
    ];

    const availableTimes = allTimes.filter((item) => !busyTime.includes(item));

    this.setState({ availableTimes });
  };

  handleMenuClick = async (time) => {
    const half = time.key.split(':')[0] < 14 ? 1 : 2;

    const responce = await fetch('http://localhost:3000/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time: time.key,
        half: half,
        dayId: this.props._id,
      }),
    });

    // const newTime = await responce.json();

    window.location.reload();
  };

  deleteTime = async (e, time) => {
    e.preventDefault();
    const responce = await fetch('http://localhost:3000/appointments', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: time._id,
      }),
    });

    window.location.reload();
    // const deletedTime = await responce.json();
  };

  render() {
    return (
      <div className="day">
        <div className="day__info">
          <p className="day__date">{this.props.date}</p>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu onClick={this.handleMenuClick}>
                {this.state.availableTimes.map((time) => (
                  <Menu.Item key={time}>{time}</Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button onClick={this.addAppointment} type="default">
              Добавить запись
            </Button>
          </Dropdown>
        </div>
        <div className="day__shift">
          {this.props.appointments.first.map((time) => (
            <Tag
              key={time._id}
              closable
              onClose={(e) => this.deleteTime(e, time)}
              color="blue"
              className="day__time"
            >
              {time.time}
            </Tag>
          ))}
        </div>
        <div className="day__shift">
          {this.props.appointments.second.map((time) => (
            <Tag
              key={time._id}
              closable
              onClose={(e) => this.deleteTime(e, time)}
              color="blue"
              className="day__time"
            >
              {time.time}
            </Tag>
          ))}
        </div>
        <Button
          danger
          className="day__delete-button"
          onClick={this.deleteDay}
          disabled={
            this.props.appointments.first.length ||
            this.props.appointments.second.length
          }
        >
          Удалить день
        </Button>
      </div>
    );
  }
}

export default Day;
