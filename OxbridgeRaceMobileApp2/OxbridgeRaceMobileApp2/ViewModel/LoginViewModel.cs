using OxbridgeRaceMobileApp2.View;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace OxbridgeRaceMobileApp2.ViewModel
{
  public  class LoginViewModel : BaseViewModel
  {
        
        public ICommand SimpleLogin => new Command(async () => {          

            // navigate to the next page after you have logged in 
            App.Current.MainPage = new NavigationPage(new MapView());
            
        });

        private string userName;
        public string UserName
        {
            get { return userName; }
            set { userName = value; OnPropertyChanged(); }
        }

        private string userPassword;

        public string UserPassword
        {
            get { return userPassword; }
            set { userPassword = value; OnPropertyChanged(); }
        }


    }
}
