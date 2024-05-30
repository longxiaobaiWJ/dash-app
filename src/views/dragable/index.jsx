import React, { useEffect, useRef, useState } from 'react';
import { getFileName, formatValue } from '../../utils/format.js';
import helperCapure from '../../utils/index.js';

function findParent(el, className = 'receiver') {
  if (el === undefined) return;

  if (el.classList.contains(className)) {
    return el;
  } else {
    return findParent(el.parentNode, className);
  }
}

function CreateFrame(props) {
  const totalVal = useRef(0);
  const onlyIdVal = useRef(0);
  const startX = useRef(0);
  const indexVal = useRef(0);
  const direction = useRef('start');
  const endCptVal = useRef(0);
  const isMoveStart = useRef(false);

  useEffect(() => {
    console.log(props.list);
  }, [props.list])

  const onMouseDown = (e) => {
    isMoveStart.current = true;

    const target = e.target;
    startX.current = e.clientX;
    totalVal.current = target.dataset.length;
    onlyIdVal.current = target.dataset.id;
    indexVal.current = target.dataset.index;
    direction.current = target.dataset.direction;

  }

  const onMouseMove = (e) => {
    if (isMoveStart.current) {
      endCptVal.current = e.clientX - startX.current;
    }
  }

  const onMouseUp = (e) => {
    isMoveStart.current = false;
    // 综合当前开发时间与渲染效率，故更新逻辑放在当前位置
    props.updateVal({
      trackNo: indexVal.current,
      id: onlyIdVal.current,
      direction: direction.current,
      value: endCptVal.current / 120
    })
  }

  const onMouseLeave = (e) => {
    isMoveStart.current = false;
  }

  const onDragStart = (e) => {
    const target = e.target;
    props.setCurrentVal({
      index: target.dataset.index,
      parent: target.dataset.parent,
    });
  }

  return (<div className='track receiver' data-index={props.index} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
    {
      props.list.map((val, index) => {
        return (<div className='is-frames-container' key={val.id} >
          <span className='slider' data-length={val.duration} data-id={val.id} data-direction="start" data-index={props.index} onMouseDown={onMouseDown} />
          <div className='layer' draggable data-parent={props.index} data-index={index} onDragStart={onDragStart}>
            <div className='title'>
              <span>{val.title}</span>
              <span>-</span>
              <span>{val.lengthVal}</span>
            </div>
            <div className='frame'>
              {
                val.frames.map((frame, index) => {
                  return <img className='frame-item' key={index} src={frame.url} alt="" />
                })
              }
            </div>
          </div>
          <span className='slider' data-length={val.duration} data-id={val.id} data-direction="finish" data-index={props.index} onMouseDown={onMouseDown} />
        </div>)
      })
    }
  </div>)
}

function DragAble(props) {
  const [currentVal, setCurrentVal] = useState(null);
  // eslint-disable-next-line
  const [thVal, setThVal] = useState(10);
  const [frames, setFrames] = useState([]);

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDrop = (e) => {
    const el = findParent(e.target);
    if (el === undefined) return;
    console.log('在放置区域内，放下了被拖拽元素~');

    const indexVal = el.dataset.index;
    const values = frames;
    let target = props.target;

    if (target.duration) {
      helperCapure(target).then(list => {
        // setThVal(thVal + 1);

        const data = {
          currentSrc: target.currentSrc,
          title: getFileName(target.currentSrc),
          frames: list,
          start: 0,
          id: Date.now().toString(),
          duration: target.duration,
          finish: target.duration,
          lengthVal: formatValue(target.duration),
        };

        if (indexVal) {
          values[indexVal].values.push(data);
        } else {
          values.push({
            id: Date.now().toString(),
            values: [data]
          });
        }

        setCurrentVal(null);
        setFrames([...values]);
      });
    } else {
      const parent = currentVal.parent;
      const cachedVal = values[parent];
      const childVal = cachedVal.values[currentVal.index];
      values[parent].values.splice(currentVal.index, 1);

      if (values[parent].values.length === 0) {
        values.splice(parent, 1);
      }

      if (indexVal) {
        values[indexVal].values.push(childVal);
      } else {
        values.push({
          id: Date.now().toString(),
          values: [childVal]
        })
      }
      setCurrentVal(null);
      setFrames([...values]);
    }
  }

  const updateFrameVal = (data) => {
    const prevState = frames[data.trackNo];
    const index = prevState.values.findIndex(v => {
      return v.id === data.id;
    });
    if (index < 0) return;

    const target = prevState.values[index];
    const currentSrc = target.currentSrc;
    let start = target.start;
    let finish = target.duration;

    if (data.direction === 'start') {
      start = ~~(start + data.value);
    } else {
      finish = ~~(finish + data.value);
    }

    const values = frames;
    helperCapure({
      currentSrc: currentSrc,
      duration: target.duration,
    }, start, finish).then(list => {
      // setThVal(thVal + 1);
      values[data.trackNo].values[index] = {
        currentSrc: target.currentSrc,
        title: getFileName(target.currentSrc),
        frames: list,
        id: Date.now().toString(),
        duration: finish,
        start: start,
        finish: target.duration,
        lengthVal: formatValue(target.duration),
      }
      setFrames(values);
      setCurrentVal({});
    })
  }

  const updateIndexVal = (value) => {
    setCurrentVal(value);
  }

  useEffect(() => {
    console.log('x useEffect x');
    // setInterval(() => {
    //   setThVal((val) => val + 1);
    // }, 2000);
  }, []);

  return (
    <div>
      <div>
        <span>{thVal}</span>
      </div>
      <div className='layout receiver' onDragOver={onDragOver} onDrop={onDrop}>
        {
          frames.map((val, index) => {
            return <CreateFrame key={val.id} index={index} list={val.values} updateVal={updateFrameVal} setCurrentVal={updateIndexVal} />
          })
        }
      </div>
    </div>
  );
}

export default DragAble;