using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace OxbridgeRaceMobileApp.ViewModel
{
    public class LogionViewModel : BaseViewModel, INotifyPropertyChanged
    {
       
        private string userEmail;
        public string UserEmail
        {
            get { return userEmail; }
            set { userEmail = value; OnPropertyChanged(); }
        }

        private string userPassword;

        public string UserPassword
        {
            get { return userPassword; }
            set { userPassword = value; OnPropertyChanged(); }
        }


    }
}
