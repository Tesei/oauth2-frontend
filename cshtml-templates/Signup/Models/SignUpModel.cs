using System.ComponentModel.DataAnnotations;

namespace FunSun.Auth.Pages.Signup.Models;

public class SignUpModel
{
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
}