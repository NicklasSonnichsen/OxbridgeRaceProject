using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OxbridgeRaceMobileApp2.ViewModel;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace OxbridgeRaceMobileApp2.View
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginView : ContentPage
    {
        public LoginView()
        {
            InitializeComponent();
            // setting bindingcontext to viewmodel
            BindingContext = new LoginViewModel();
        }

    }
}