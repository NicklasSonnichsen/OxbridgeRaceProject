using OxbridgeRaceMobileApp2.View;
using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace OxbridgeRaceMobileApp2
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
            // setting mainpage to loginview
            MainPage = new LoginView();
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
