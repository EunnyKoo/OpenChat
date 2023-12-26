import React from 'react';
import { Link } from 'react-scroll';

const ScrollComponent = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="section1" smooth={true} duration={500}>
              섹션 1
            </Link>
          </li>
          <li>
            <Link to="section2" smooth={true} duration={500}>
              섹션 2
            </Link>
          </li>
          {/* 추가적인 섹션들 */}
        </ul>
      </nav>

      <div id="section1" style={{ height: '500px', backgroundColor: 'lightblue' }}>
        섹션 1의 내용
      </div>
      <div id="section2" style={{ height: '500px', backgroundColor: 'lightcoral' }}>
        섹션 2의 내용
      </div>
      {/* 추가적인 섹션들 */}
    </div>
  );
};

export default ScrollComponent;
