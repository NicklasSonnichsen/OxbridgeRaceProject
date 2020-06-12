using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;

using Xunit;
using OxbridgeRaceMobileApp2;
using Xamarin.Forms;

namespace UnitTesting
{
    public class UnitTestClass
    {
        [Fact]
        public void TestLogin()
        {
            var user = new OxbridgeRaceMobileApp2.Model.CrewLoginInfo() { fld_CrewName = "test2", fld_Password = "testtest" };
            var testLogin = new OxbridgeRaceMobileApp2.ViewModel.LoginViewModel();

            testLogin.UserName = user.fld_CrewName;
            testLogin.UserPassword = user.fld_Password;


            Assert.True(testLogin.IsSuccesFull);

        }

        [Fact]
        public void TroubleShooting()
        {
            int a = 5;

            Assert.True(a > 2);
        }
    }
}