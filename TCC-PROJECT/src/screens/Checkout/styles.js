import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  background-color: ${ props => props.theme.colors.light };
  height: 100%;
`;

export const Content = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 30px 10px 0 10px;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  margin: 25px 0;
`;

export const ContainerProducts = styled.View`
  /* border: 1px solid red; */
  flex: 1;
`;

// Card Modal

export const ContanerModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const ModalContent = styled.View`
  background-color: ${ props => props.theme.colors.white};
  min-width: 350px;
  max-height: 500px;
  align-items: center;
  padding: 10px 5px;
  border-radius: 5px;
`;

export const ModalCardList = styled.ScrollView`
  margin-top: 12px;

`;

export const CardLine = styled.View`
  flex-direction: row;
`;

export const CardWrapper = styled.View`
  margin-top: 10px;
  padding: 10px;
`;


/*
modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});*/