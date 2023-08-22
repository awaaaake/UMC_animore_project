import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import DaumPostcode from 'react-daum-postcode'

const Background = styled.div`
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
`;

const FirstTextContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
`;

const FirstText = styled.div`
  font-family: NanumBarunGothic;
  font-size: 33px;  
  line-height: 48px;
  display: flex;
  align-items: flex-end;
  letter-spacing: -2px;
  font-weight: bold;
`;

const FirstextImg = styled.img`
  width: 240px;
  height: 60px;
`;

const SecondTextContainer = styled.div`
  display: flex;
  flex-direction: column; /* 요소들을 수직으로 정렬하기 위해 추가 */
  justify-content: center;
  position: absolute;
  top: 14%;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
`;

const SecondText = styled.div`
  font-family: NanumBarunGothic;
  font-size: 18px;
  line-height: 30px;
  display: flex;
  align-items: left;
  padding-left: 15px;
  padding-top: 12px;
  letter-spacing: -2px;
  color: #808080;
`;

const SecondTextOption = styled.div`
  font-family: NanumBarunGothic;
  font-size: 18px;
  line-height: 30px;
  display: flex;
  align-items: left;
  padding-left: 15px;
  padding-top: 12px;
  letter-spacing: -2px;
  font-weight: bold;
`;

const Divider = styled.div`
  position: relative;
  height: 2px;
  width: 100%;
  background-color: #C0C0C0;
`;

const XText = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  font-size: 20px;
  color: #C0C0C0;
  background-color: white;
  height: 1px; /* 구분선의 높이를 1px로 설정합니다. */
`;

const HorizontalDivider = () => {
  return (
    <Divider>
      <XText>x</XText>
    </Divider>
  );
};


const Input = styled.input`
  /* input 요소의 스타일을 지정합니다. */
  width: 60%;
  height: 30px;
  padding: 10px 15px;
  font-size: 18px;
  border: 0px;
  border-radius: 5px;
  outline: none; /* 포커스 시 외곽선 제거 */
  box-shadow: none; /* 포커스 시 그림자 제거 */
  margin: 0 auto; 
  position: absolute;
  left: 33%;
  font-weight: bold;
  font-family: NanumBarunGothic;
  letter-spacing: -2px;

  /* 포커스 시 테두리 스타일 설정 */
  &:focus {
    box-shadow: 0 0 5px gray; /* 포커스 시 테두리에 약간의 그림자 효과 추가 */
  }
`;

const Select = styled.select`
  position: absolute;
  left: 35%;
  height: 25px;
  width: 150px;
  font-size: 20px;
  /* font-weight: bold; */
  font-family: NanumBarunGothic;
  letter-spacing: -2px;

`;


const Padding1 = styled.div`
  padding-left: 160px; 
`;

const Padding2 = styled.div`
  padding-left: 48px; 
`;

const Label = styled.label`
  /* margin-left: 100px; */ 
  display: flex;
  align-items: center;
  flex-direction: row-reverse; /* 라디오 버튼을 텍스트의 오른쪽에 배치하기 위해 요소 순서를 반대로 조정합니다. */
  justify-content: flex-end; /* 텍스트를 라디오 버튼의 오른쪽으로 이동시킵니다. */
  font-weight: bold;
  font-family: NanumBarunGothic;
  letter-spacing: -2px;
  font-size: 18px; /* 체크 마크의 크기를 조정합니다. */
  font-weight: bold;
  color: #000; /* 체크 마크의 색상을 설정합니다. */
`;


const CheckBoxInput = styled.input.attrs({ type: 'checkbox' })`
  vertical-align: middle;
  appearance: none;
  border: 2px solid gray;
  border-radius: 3px;
  width: 20px;
  height: 30px;
  margin-left: 30px;
  margin-bottom: 2px;
  

  &:checked {
  /* 체크 마크를 표시하기 위한 가상 요소(::before)를 사용합니다. */
  &::before {
    content: '\u2713'; /* 유니코드로 체크 마크(✓)를 표시합니다. */
    display: block;
    position: absolute;
    font-size: 20px; /* 체크 마크의 크기를 조정합니다. */
    font-weight: bold;
    color: #000; /* 체크 마크의 색상을 설정합니다. */
    pointer-events: none; /* 체크 마크가 실제로 클릭되지 않도록 이벤트를 무시합니다. */
  }
}
`;


const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  justify-content: center;
  bottom: 1%;
`;

const NextButton = styled.button`
  width: 210px;
  height: 50px;
  background-color: #A0136A;
  color: #FFFFFF;
  font-size: 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px;
  font-family: NanumBarunGothic;
  /* font-weight: bold; */
  letter-spacing: -2px; /* 글자 간격을 좁게 설정 */
`;



const petgenderToString = (petgender) => {
  const selectedGenders = Object.keys(petgender).filter(key => petgender[key]);
  return selectedGenders.join(','); // 선택된 성별을 쉼표로 구분하여 문자열로 반환
};



const SignUp = () => {
  // 추가 정보 입력 상태 정의 및 초기값 설정
  const [address, setAddress] = useState('');
  const [petname, setpetname] = useState('');
  const [pettype, setpettype] = useState(''); // 강아지의 종류를 저장하는 상태
  const [petgender, setpetgender] = useState(''); // 강아지의 성별을 저장하는 상태
  const [petWeight, setPetWeight] = useState(0); // 강아지의 몸무게를 저장하는 상태
  const [age, setAge] = useState(0); // 강아지의 나이를 저장하는 상태
  const [specials, setspecials] = useState('');
  const [nickname, setnickname] = useState('');
  const [password, setpassword] = useState('');
  const [phone, setphone] = useState('');
  const [birth, setbirth] = useState(''); 
  
  

  const navigate = useNavigate();

  // "다음" 버튼 클릭 시 동작하는 함수
  const handleNextClick = () => {
    // 필수 항목인지 확인하고 누락된 경우 경고 메시지 표시
    if (!address || !petname || !pettype || !petgender || !nickname || !password || !phone ) {
      alert('주소, 반려동물이름, 반려동물종류, 성별, 닉네임, 2차 비밀번호는 필수 입력사항입니다!');
      return;
    }

    // 비밀번호 길이 체크 추가
    if (password.length < 4 || password.length > 16) {
      alert('비밀번호는 4~16자리로 입력해주세요.');
      return;
    }

    const petTypeString = pettype.toString();

    // 데이터를 POST 요청으로 서버에 보내는 코드
    const data = {
      address,
      petname,
      pettype: petTypeString,
      petgender: petgenderToString(petgender),
      phone,
      password,
      nickname,
      birth,
      specials,
      petWeight,
      age
    };


    // const token = useSelector(state => state.token);
    const token = ''

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('API Response:', data); // 서버의 응답을 콘솔에 출력
      // 다음 페이지로 이동하는 코드
      navigate('/signupNext');
    })
    .catch(error => {
      console.error('API Error:', error);
    });
  };


  return (
    <Background>
      <FirstTextContainer>
        <FirstextImg src="https://cloud.adofai.gg/apps/files_sharing/publicpreview/cj4GTz3xLmExWjG?file=/10.png&fileId=7306&x=1920&y=1080&a=true" alt="이미지" />
        <FirstText>회원가입</FirstText>
      </FirstTextContainer>

      <SecondTextContainer>
        <SecondTextOption>추가정보기입 (선택)</SecondTextOption>
        <HorizontalDivider />

        <SecondText>
            닉네임:
            <Input type="text" value={nickname} onChange={(e) => setnickname(e.target.value)} />
        </SecondText>
        <HorizontalDivider />

        <SecondText>
            생년월일 ( ex: 000101 ):
            <Input type="text" value={birth} onChange={(e) => setbirth(e.target.value)} />
        </SecondText>
        <HorizontalDivider />

        <SecondText>
            전화번호:
            <Input type="text" value={phone} onChange={(e) => setphone(e.target.value)} />
        </SecondText>
        <HorizontalDivider />

        <SecondText>
            주소:
            <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </SecondText>
        <HorizontalDivider />

        <SecondText>
          반려동물이름:
          <Input type="text" value={petname} onChange={(e) => setpetname(e.target.value)} />
        </SecondText>
        <HorizontalDivider />

        <SecondText>
          반려동물종류:
          <Select value={pettype} onChange={(e) => setpettype(e.target.value)}>
            <option value="">선택하세요</option>
            <option value="Dog">개</option>
            <option value="Cat">고양이</option>
            <option value="Hamster">햄스터</option>
            {/* 추가적인 강아지의 종류 옵션을 필요에 맞게 추가하세요 */}
          </Select>
        </SecondText>
        <HorizontalDivider />

        <SecondText>
            성별:   
            <Padding1></Padding1>                   
            <Label>
              <CheckBoxInput
                name="petgender"
                value="Male"
                checked={petgender.Male}
                onChange={() => setpetgender((prevState) => ({ ...prevState, Male: !prevState.Male }))}
              />수컷
            </Label>
            <Padding2></Padding2>
            <Label>
              <CheckBoxInput
                name="petgender"
                value="Female"
                checked={petgender.Female}
                onChange={() => setpetgender((prevState) => ({ ...prevState, Female: !prevState.Female }))}
              />
              암컷
            </Label>
            <Padding2></Padding2>
            <Label>
              <CheckBoxInput
                name="petgender"
                value="Neutral"
                checked={petgender.Neutral}
                onChange={() => setpetgender((prevState) => ({ ...prevState, Neutral: !prevState.Neutral }))}
              />
              중성화
            </Label>
        </SecondText>
        <HorizontalDivider />

        <SecondText>
          반려동물무게(kg):
          <Input type="number" value={petWeight} onChange={(e) => setPetWeight(e.target.valueAsNumber)} />
        </SecondText>
        <HorizontalDivider />

        <SecondText>
          나이:
          <Input type="number" value={age} onChange={(e) => setAge(e.target.valueAsNumber)} />
        </SecondText>
        <HorizontalDivider />

        <SecondText>
          특이사항:
          <Input type="text" value={specials} onChange={(e) => setspecials(e.target.value)} />
        </SecondText>
        <HorizontalDivider />

        <SecondText>
            2차 비밀번호:
            <Input type="text" value={password} onChange={(e) => setpassword(e.target.value)} />
        </SecondText>
        <HorizontalDivider />

      </SecondTextContainer>
      <ButtonContainer>
        {/* 다음 버튼 클릭 시 handleNextClick 함수 호출 */}
        <NextButton onClick={handleNextClick}>다음</NextButton>
      </ButtonContainer>
    </Background>
  );
};

export default SignUp;
